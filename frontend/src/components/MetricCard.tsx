type MetricCardProps = {
  label: string
  value: string
  detail: string
  detailClassName?: string
}

function MetricCard({
  label,
  value,
  detail,
  detailClassName = 'text-slate-400',
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      <div className={`mt-2 text-xs ${detailClassName}`}>{detail}</div>
    </div>
  )
}

export default MetricCard
