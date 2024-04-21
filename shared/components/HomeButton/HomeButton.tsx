import { Button } from "@mui/material";
import { useRouter } from "next/router";

const HomeButton = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleHome}>
      Home
    </Button>
  );
};

export default HomeButton;
