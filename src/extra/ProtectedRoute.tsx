import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
 

// export const UserProtectedRoute = () => {
//     const isUserAuth = useSelector((state: any) => state?.isUser); 
//     const location = useLocation();  
//     console.log('lo', location.pathname)
//     console.log('isuser', isUserAuth)
   
//     // if (isUserAuth && location.pathname === "/login") {
//     //   return <Navigate to="/home" />;  
//     // }
   
//     return (
//       isUserAuth ? <Outlet/> : <Navigate to='/login'/>
//     )
   
//   };
  