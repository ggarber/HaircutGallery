import HaircutGallery from "@/components/HaircutGallery";
import { Helmet } from "react-helmet";
import FeedbackButton from '../components/FeedbackButton';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Trendy Haircut Styles | Find Your Perfect Look</title>
        <meta 
          name="description" 
          content="Discover popular haircut styles for all preferences. Browse our curated collection of trendy male and female haircuts to find your perfect look."
        />
        <meta property="og:title" content="Trendy Haircut Styles | Find Your Perfect Look" />
        <meta property="og:description" content="Explore our curated collection of popular haircut styles for men and women." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <HaircutGallery />
        <FeedbackButton />
      </div>
    </>
  );
}
