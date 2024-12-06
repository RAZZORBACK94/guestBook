'use client'

import { useState } from "react";
import { toast } from "sonner";
import { GuestProps } from "../lib/types";

interface uiProps{
    dataGuest: GuestProps[] | undefined
}

export default function Ui({dataGuest}:uiProps) {


  return (
    <>
    {dataGuest !== undefined && dataGuest?.map((item, index) =>(
        <div key={index}>
            <p>guest ke-{index+1}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.telp}</p>
        </div>
    ))}
    </>
    
  );
}
