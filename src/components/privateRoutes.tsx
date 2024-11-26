import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface PrivateRouteProps {
     children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
     const { user } = useAuth();
     const location = useLocation();

     if (!user) {
          return <Navigate to="/login" state={{ from: location }} replace />;
     }

     return <>{children}</>;
}
