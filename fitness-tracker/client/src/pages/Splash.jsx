import { Box } from "@mui/material";

function Splash() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box
        className="Main-info-block"
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            mr: -20,
            mt: -30,
          }}
        >
          <Box sx={{ fontSize: 48, fontWeight: "bold" }}>Log Workouts</Box>
          <Box sx={{ fontSize: 48, fontWeight: "bold", mt: -1 }}>
            Track Progress
          </Box>
          <Box
            sx={{
              fontSize: 48,
              fontWeight: "bold",
              mt: -1,
            }}
          >
            See Results
          </Box>
          <Box sx={{ overflow: "scroll", fontSize: 18 }}>
            Pulse is a fully free fitness tracker. Build routines, track
            progress, and reach greater hights
          </Box>
        </Box>
        <Box component="img" src="https://placehold.co/400x600" />
      </Box>

      <Box
        className="Info-block"
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box
          component="img"
          src="https://placehold.co/400x600"
          sx={{ mr: -20 }}
        />
        <Box
          sx={{
            maxWidth: 600,
          }}
        >
          <Box sx={{ fontSize: 48, fontWeight: "bold", mt: -20 }}>
            Workout Logging
          </Box>
          <Box sx={{ fontSize: 24, mt: -3 }}>
            <ul>
              <li> Log workouts with date, duration, and workout type</li>
              <li>Add exercises with sets, reps, weight, and rest time</li>
              <li>Support strength training, cardio, and custom workouts</li>
              <li> Track progression over time for each exercise</li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box
        className="Info-block"
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            mr: -20,
          }}
        >
          <Box sx={{ fontSize: 48, fontWeight: "bold" }}>Weight Tracking</Box>

          <Box sx={{ fontSize: 24, mt: -3 }}>
            <ul>
              <li>Log body weight entries with date and time</li>
              <li>Support multiple units (kg/lb) with automatic conversion</li>
              <li>View weight history in a chronological log</li>
              <li>Display trends over time (daily, weekly, monthly)</li>
            </ul>
          </Box>
        </Box>
        <Box component="img" src="https://placehold.co/400x600" />
      </Box>
      <Box
        className="Info-block"
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: 4,
        }}
      ></Box>
    </Box>
  );
}

export default Splash;
