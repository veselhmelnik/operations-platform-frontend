import TaskStats from '../components/TaskStats'
import TaskTable from '../components/TaskTable/TaskTable'

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-5">
      <TaskStats />
      <TaskTable />
    </div>
  )
}
