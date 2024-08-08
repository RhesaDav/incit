import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile')
  }, [navigate]);

  return <div>Processing authentication...</div>;

}

export default OAuthCallback;
