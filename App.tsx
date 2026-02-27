import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Recommendations from "./pages/Recommendations";
import RecommendationDetail from "./pages/RecommendationDetail";
import NewReleases from "./pages/NewReleases";
import TBR from "./pages/TBR";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Shop from "./pages/Shop";
import Settings from "./pages/Settings";
import EditName from "./pages/EditName";
import EditTastes from "./pages/EditTastes";
import EditFavorites from "./pages/EditFavorites";
import EditRace from "./pages/EditRace";
import MyAvatars from "./pages/MyAvatars";
import ThreadDetail from "./pages/ThreadDetail";
import BookDetail from "./pages/BookDetail";
import CollectionDetail from "./pages/CollectionDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/onboarding" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/threads/:id" element={<ProtectedRoute><ThreadDetail /></ProtectedRoute>} />
            <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
            <Route path="/rooms/:roomId" element={<ProtectedRoute><RoomDetail /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
            <Route path="/recommendations/:id" element={<ProtectedRoute><RecommendationDetail /></ProtectedRoute>} />
            <Route path="/new-releases" element={<ProtectedRoute><NewReleases /></ProtectedRoute>} />
            <Route path="/tbr" element={<ProtectedRoute><TBR /></ProtectedRoute>} />
            <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="/shop/collection/:id" element={<ProtectedRoute><CollectionDetail /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/edit-name" element={<ProtectedRoute><EditName /></ProtectedRoute>} />
            <Route path="/edit-tastes" element={<ProtectedRoute><EditTastes /></ProtectedRoute>} />
            <Route path="/edit-favorites" element={<ProtectedRoute><EditFavorites /></ProtectedRoute>} />
            <Route path="/edit-race" element={<ProtectedRoute><EditRace /></ProtectedRoute>} />
            <Route path="/my-avatars" element={<ProtectedRoute><MyAvatars /></ProtectedRoute>} />
            <Route path="/books/:bookId" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
