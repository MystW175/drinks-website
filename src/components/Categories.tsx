import Image from "next/image"
import Link from "next/link"

const callouts = [
    {
      name: 'Beverage',
      description: 'Beverage supplies',
      imageSrc: 'https://images.unsplash.com/photo-1596710629144-6f6abf933384?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Tea cup and flowers strewn, viewed from above',
      href: '/search?query=Beverage',
    },
    {
      name: 'Assesories',
      description: 'Mugs and Spoonware',
      imageSrc: 'https://images.unsplash.com/photo-1602632066350-4206c806ebdb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Collection of mugs',
      href: '/search?query=Mug',
    },
    {
      name: 'Aesthetic',
      description: 'Decorative essentials',
      imageSrc: 'https://images.unsplash.com/photo-1572950947476-26a6e4111e80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Collection of many different stickers on wall',
      href: '/search?query=Aesthetic',
    },
  ]
  
  export default function Categories() {
    return (
      <div className="bg-gray-100 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-10 lg:max-w-none lg:py-16">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 transition-all
                  ">
                    <Image
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                      width={500} 
                      height={500}
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  