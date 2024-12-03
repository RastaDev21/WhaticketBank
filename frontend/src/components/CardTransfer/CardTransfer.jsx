import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card
      sx={{
        width: "151px",
        height: "131px",
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0px 0px 23px -1px rgba(50, 50, 50, 0.10)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "71px",
            height: "71px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "14px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="71"
            height="71"
            viewBox="0 0 71 71"
            fill="none"
          >
            <circle cx="35.5" cy="35.5" r="35.5" fill="#3956FF" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: "absolute",
            }}
          >
            <g clipPath="url(#clip0_9010_2180)">
              <path
                d="M4 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM4 6V18H20V6H4ZM12 10.5C12.3978 10.5 12.7794 10.658 13.0607 10.9393C13.342 11.2206 13.5 11.6022 13.5 12C13.5 12.3978 13.342 12.7794 13.0607 13.0607C12.7794 13.342 12.3978 13.5 12 13.5C11.6022 13.5 11.2206 13.342 10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12C10.5 11.6022 10.658 11.2206 10.9393 10.9393C11.2206 10.658 11.6022 10.5 12 10.5Z"
                fill="white"
              />
              <path
                d="M20.0101 23.5H20.5101V23V19.6617L21.4242 20.5758L21.7778 20.9293L22.1313 20.5758L23.3536 19.3536L23.7071 19L23.3536 18.6464L19.3536 14.6464L19 14.2929L18.6464 14.6464L14.6464 18.6464L14.2929 19L14.6464 19.3536L15.8687 20.5758L16.2222 20.9293L16.5758 20.5758L17.4899 19.6617V23V23.5H17.9899H20.0101Z"
                fill="white"
                stroke="#3956FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_9010_2180">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginTop: "8px",
            color: "#7A7A80",
            textAlign: "center",
            fontFamily: "Montserrat",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          Transferir
        </Typography>
      </CardContent>
    </Card>
  );
}