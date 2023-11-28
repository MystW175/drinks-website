import Carousel from '@/components/Carousel'
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/productCard'
import { prisma } from '@/lib/db/prisma'

interface AllProductPageProps{
    searchParams: { page: string};
  }

  
export default async function AllProductPage({searchParams : {page = "1"} }: AllProductPageProps){
    const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 0;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount-heroItemCount)/pageSize);

  const products = await prisma.product.findMany({
    orderBy: {id: "desc"},
    skip: (currentPage - 1 ) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  })
  return (
  <div className='flex flex-col items-center'>
    <div className='flex items-center justify-center flex-col'>
      <div className='my-5 mx-3 grid gap-y-5 gap-x-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
    {totalPages > 1 &&
    <PaginationBar currentPage={currentPage} totalPages={totalPages}/>
    }
  </div>)
}