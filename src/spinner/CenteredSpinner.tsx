import { Spinner } from "@chakra-ui/react";

export const CenteredSpinner: React.FC = () => {
    return (
        <div className="centered">
          <Spinner size="lg" color="var(--logo-color)" />
        </div>
      );
}