#!/usr/bin/env python
# coding: utf-8

# In[1]:


from sqlalchemy import create_engine, text
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import fuzz
import pickle


# 

# In[2]:


# PostgreSQL connection details
# db_url = 'postgresql://postgres:11201_VivekBhalke@localhost:5432/majduri'
db_url = 'postgresql://neondb_owner:npg_E8ISquQk3oRc@ep-delicate-field-a1gajmto-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
engine = create_engine(db_url)


# In[3]:


engine.connect()


# In[23]:


query = """SELECT r."id" as recruiterJobId, mlj."title" AS job_title, 
              mlj."salary" AS salary_range,
                  STRING_AGG(mls."name", ' ') AS skills, 
                  r."location", r."preferance" as preference, r."experience", r."qualifications"
           FROM "RecruiterJob" r 
           JOIN "MLJob" mlj ON mlj."id" = r."mlJobId"
           JOIN "RecruiterSkills" rsk ON rsk."recruiterJobId" = r."id"
           JOIN "MLSkill" mls ON mls."id" = rsk."skillId"
           GROUP BY r."id", mlj."title", mlj."salary" , r."location", r."preferance", r."experience", r."qualifications";"""
df = pd.read_sql(query, engine)


vectorizer = TfidfVectorizer(stop_words='english')

weights = {"skills" : 5,
           "location" : 1.3,
           "experience" : 3,
           "preference" : 2.5,
           }

# assigning weight to a column to indicate its priority


# In[25]:

df["combined"] = df["skills"] + " " + df["experience"] + " " + df['location'] + " " + df["preference"]

# combined string in the order -> skills experience location preference (for vectorization)


# In[26]:


tfidf_matrix = vectorizer.fit_transform(df["combined"])

# creating a vectorized matrix of size of the dataframe (size of df, total features)


feature_names = vectorizer.get_feature_names_out()

# In[29]:


weight_vector = np.ones(len(feature_names))

# creating an array of 1s of the size of feature_names


# In[33]:


skills_words = " ".join(df["skills"].dropna()).split()
experience_words = " ".join(df["experience"].dropna().astype(str)).split()
location_words = " ".join(df["location"].dropna()).split()
preference_words = " ".join(df["preference"].dropna()).split()

# creating a map of a word and its category
word_category_map = {}

for word in skills_words:
    word_category_map[word] = "skills"

for word in experience_words:
    word_category_map[word] = "experience"

for word in location_words:
    word_category_map[word] = "location"

for word in preference_words:
    word_category_map[word] = "preference"
    
# 
for i, term in enumerate(feature_names):
    category = word_category_map.get(term)  # Get the category of the term
    if category:
        weight_vector[i] *= weights[category] # apply the weight


"""
kinda have to explain this one, no?
here, size of ifidf_matrix is (9999, 193) ie 10000 rows 193 columns, and weight_matrix (193, 1)

dataset has 10000 rows, and our feature_names size is 193, thus we can multiply them (vector product)
"""
tfidf_matrix = tfidf_matrix.multiply(weight_vector)


# In[34]:


def location_similarity(loc1, loc2):
    return fuzz.ratio(loc1, loc2) / 100 # value between 0-1


# 

# In[36]:


def recommend_job(skills, experience, location, preference, top_n=30):
    # query = """SELECT mlj."title" AS job_title, 
    #           mlj."salary" AS salary_range,
    #               STRING_AGG(mls."name", ' ') AS skills, 
    #               r."location", r."preferance" as preference, r."experience", r."qualifications"
    #        FROM "RecruiterJob" r 
    #        JOIN "MLJob" mlj ON mlj."id" = r."mlJobId"
    #        JOIN "RecruiterSkills" rsk ON rsk."recruiterJobId" = r."id"
    #        JOIN "MLSkill" mls ON mls."id" = rsk."skillId"
    #        GROUP BY r."id", mlj."title", mlj."salary" , r."location", r."preferance", r."experience", r."qualifications";"""
    # df = pd.read_sql(query, engine)

    combined_str = ' '.join(skills) + " " + experience + " " + location + " " + preference
    user_vector = vectorizer.transform([combined_str])
    
    tfidf_similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()

    location_scores = df["location"].apply(lambda job_loc: location_similarity(job_loc, location))

    refined_scores = tfidf_similarities * location_scores

    top_indices = refined_scores.argsort()[-top_n:][::-1]

    return df.iloc[top_indices][["recruiterjobid","job_title", "skills", "salary_range", "location", "preference", "experience"]]


# In[37]:


# recommend_job(['cleaning', 'laundry', 'cooking'], "3_to_4_years", "mumbai", "female")


# In[41]:


with open("vectorizer.pkl", 'wb') as file:
    pickle.dump(vectorizer, file)

with open("matrix.pkl", 'wb') as file:
    pickle.dump(tfidf_matrix, file)

