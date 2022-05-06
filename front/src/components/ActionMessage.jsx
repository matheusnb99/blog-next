import { useContext } from "react"
import AppContext from "../../AppContext"

const ActionMessage = () => {
  const { showElement } = useContext(AppContext)

  return (
    <div>
      <div>
        {showElement ? (
          <div>
            <p className="text-2xl border border-green-300 bg-green-300">
              Successfully added
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
export default ActionMessage
