import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { POST_USERS_API_ROUTE } from "../_services/services";

export default function useCreate() {
  const create = async (data: any) =>  await axios.post(POST_USERS_API_ROUTE, data);
  console.log('response create', create);
  return { create };
}
