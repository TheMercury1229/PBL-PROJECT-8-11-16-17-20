import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user";

const InitUser = () => {
  const navigate = useNavigate();
  const id = useUserStore((state) => state.id);
  const {
    setId,
    setFullName,
    setEmail,
    setMobile,
    setRole,
    setLoggedIn,
  } = useUserStore();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/auth/me", {
          withCredentials: true,
        });
        console.log(response.data.data.id)
        setId(response.data.data.id);
        setEmail(response.data.data.email);
        setRole(response.data.data.role);
        setFullName(response.data.data.fullName);
        setMobile(response.data.data.mobile);
        setLoggedIn(true);
        navigate("/")
        
      } catch (error) {
        console.error("User initialization failed", error);
        setLoggedIn(false);
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return (<></>)
};

export default InitUser;
