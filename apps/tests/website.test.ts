import { describe, it , expect } from "bun:test";
import axios from "axios";

let BASE_URL = "http://localhost:3000";

describe("Website gets created", () => {
      it("website not created if url is not provided", async () => {
      })
   

      it("website created if url is present ", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
          url: "https://google.com"
        });
        expect(response.data.id).not.toBeNull();
      });
 })