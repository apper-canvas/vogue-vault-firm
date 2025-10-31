import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

const HomePage = lazy(() => import("@/components/pages/HomePage"));
const CategoryPage = lazy(() => import("@/components/pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("@/components/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/components/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/components/pages/CheckoutPage"));
const WishlistPage = lazy(() => import("@/components/pages/WishlistPage"));
const LoginPage = lazy(() => import("@/components/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/components/pages/RegisterPage"));
const AccountPage = lazy(() => import("@/components/pages/AccountPage"));
const OrderHistoryPage = lazy(() => import("@/components/pages/OrderHistoryPage"));
const ProfilePage = lazy(() => import("@/components/pages/ProfilePage"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const mainRoutes = [
  {
    path: "",
    index: true,
    element: withSuspense(HomePage)
  },
  {
    path: "category/:category",
    element: withSuspense(CategoryPage)
  },
  {
    path: "product/:id",
    element: withSuspense(ProductDetailPage)
  },
  {
    path: "cart",
    element: withSuspense(CartPage)
  },
  {
    path: "checkout",
    element: withSuspense(CheckoutPage)
  },
  {
    path: "wishlist",
    element: withSuspense(WishlistPage)
  },
  {
    path: "login",
    element: withSuspense(LoginPage)
  },
  {
    path: "register",
    element: withSuspense(RegisterPage)
  },
  {
    path: "account",
    element: (
      <ProtectedRoute>
        {withSuspense(AccountPage)}
      </ProtectedRoute>
    )
  },
  {
    path: "orders",
    element: (
      <ProtectedRoute>
        {withSuspense(OrderHistoryPage)}
      </ProtectedRoute>
    )
  },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        {withSuspense(ProfilePage)}
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: withSuspense(NotFound)
  }
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);