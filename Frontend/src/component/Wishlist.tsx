import { useContext } from "react"
import { ApiContext } from "../context/ApiContext"

function Wishlist() {
  const apiData=useContext(ApiContext)
  return (
    <div>
     {apiData}
    </div>
  )
}

export default Wishlist
