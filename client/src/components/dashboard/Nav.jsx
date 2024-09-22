import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

function Nav() {
  const [user, setUser] = useState(null);

  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        // const decoded = jwtDecode(token);

        try {
          const response = await fetch("http://localhost:3000/api/auth/user", {
            headers: {
              "x-auth-token": token,
            },
          });

          const data = await response.json();
          if (response.ok) {
            console.log({ data });
            setUser(data);
          } else {
            toast(data.message);
            localStorage.removeItem("token");
            // navigate("/login");
          }
        } catch (error) {
          console.log("ERROR", error);
          //   if (error.response) {
          //     if (
          //       error.response.status === 401 &&
          //       error.response.data.message === "Token is expired!"
          //     ) {
          //       toast("Token expired, logging out...");
          //       localStorage.removeItem("token");
          //       navigate("/login");
          //     } else {
          //       toast(error.response.data);
          //       console.error(error.response.data);
          //     }
          //   }
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="flex items-center justify-between py-5">
      <div className="font-semibold font-primary uppercase text-2xl pl-5 pt-3">
        <span className="text-slate-900">Organize</span>
        <span className="italic text-primary">me</span>
      </div>
      <div className="flex gap-3 mr-5">
        {user && (
          <div className="cursor-pointer hover:opacity-90">
            <div className="h-12 w-12 bg-primary rounded-full text-white font-bold grid  place-items-center">
              <span>
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => handleLogout()}
          className="bg-red-600 text-white w-20 py-1 px-3 rounded-lg hover-links"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;
