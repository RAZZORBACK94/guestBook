'use server'

import Ui from "./ui";
import { getGuest } from "../api/user";

export default async function Home() {

    const dataGuest = await getGuest()

  return (
    <Ui dataGuest={dataGuest}/>
  );
}
