import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material/styles";
import React from "react";
import {
    amber,
    blue,
    cyan,
    deepOrange,
    green,
    lightBlue,
    lightGreen,
    pink,
    purple,
    red
} from "@mui/material/colors";
import { BorderTop } from "@mui/icons-material";


declare module "@mui/material/styles"{
    interface Palette{
        blueColor:PaletteColor;
        redColor:PaletteColor;
        greenColor:PaletteColor;
    }
    interface PaletteOptions{
        blueColor?:PaletteColorOptions;
        redColor?:PaletteColorOptions;
        greenColor?:PaletteColorOptions;
    }
}


export const theme=createTheme({
    typography:{
        fontFamily:'Noto sans JP, Roboto, "Helvetica Neue, Arial, sans-serif',
        fontWeightRegular:400,
        fontWeightMedium:500,
        fontWeightBold:700,
    },

    palette:{
        blueColor:{
            main: "#007bff",
            light: blue[100],
            dark: blue[700],
            // lighter:blue[50],
        },
        redColor:{
            main:red[500],
            light:red[100],
            dark:red[700],
        },
        greenColor:{
            main:green[500],
            light:green[100],
            dark:green[700],
        },
    },
    components: {
        MuiAutocomplete: {
          styleOverrides: {
            inputRoot: {
              '& .MuiInputBase-input': {
                width: '100% !important', // Override the width here
                placeholder:'nyuu',
              },
            },
          },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        borderTop: "1px solid black", // Add borderTop style here
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid black", // Add borderBottom style here
                    borderLeft: "1px solid black",
                    borderRight:"1px solid black"
                },
            },
        },
    },
}

);

