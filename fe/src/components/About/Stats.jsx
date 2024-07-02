const stats = [
  { name: "Weekly users", value: "80+" },
  { name: "Pets adopted", value: "19" },
  { name: "Volunteers", value: "20+" },
  { name: "Animals rescued", value: "35" },
];

export default function Stats() {
  return (
    <>
      <a name="stats" className="text-5xl font-semibold tracking-tight">Save a life</a>
      <p className="mt-6 text-lg leading-8 text-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas justo nibh, ut laoreet sapien scelerisque eleifend. Vestibulum gravida nibh nunc, id ultricies risus consectetur a.
      </p>
    
      <dl className="mt-16 grid grid-cols-2 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex bg-container flex-col-reverse rounded-lg shadow-md p-5">
            <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
            <dd className="text-2xl font-bold leading-9 tracking-tight">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </> 
  )
}
