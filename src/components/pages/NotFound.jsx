import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ApperIcon
            name="PackageX"
            size={120}
            className="mx-auto text-primary/20 mb-6"
          />
          <h1 className="text-6xl font-display font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl font-display font-semibold text-primary mb-2">
            Page Not Found
          </h2>
          <p className="text-primary/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate("/")}
          >
            <ApperIcon name="Home" size={20} />
            Back to Home
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            <ApperIcon name="ArrowLeft" size={20} />
            Go Back
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary">
          <p className="text-sm text-primary/60">
            Need help? Contact our{" "}
            <button
              onClick={() => navigate("/")}
              className="text-accent hover:underline font-medium"
            >
              customer support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;