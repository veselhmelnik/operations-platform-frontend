import { TASK_STATS_ITEMS } from '../utils/constants'
import { IoIosArrowForward } from 'react-icons/io'

const TaskStats = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-col-2 sm:grid-cols-2 lg:grid-cols-4">
      {TASK_STATS_ITEMS.map((item) => {
        return (
          <div
            key={item.id}
            className="max-w-sm rounded-xl border border-border p-3 shadow-sm flex flex-col gap-2"
          >
            <h3 className="font-semibold">{item.label}</h3>
            <span className="text-3xl font-semibold">{item.count}</span>
            <div className="border-t border-border pt-2 flex items-center justify-between text-[0.7rem] text-gray-400 rounded-b-2xl">
              {item.footer}
              <IoIosArrowForward className="cursor-pointer" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TaskStats
