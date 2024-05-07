// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		// Redirect them to the login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that location after they log in.
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
