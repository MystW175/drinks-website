import Carousel from '@/components/Carousel'
import Categories from '@/components/Categories';
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/productCard'
import { prisma } from '@/lib/db/prisma'

interface HomeProps{
  searchParams: { page: string};
}

export default async function Home({searchParams : {page = "1"} }: HomeProps) {
 
  return (
  <div className='flex flex-col items-center'>
    <Carousel/>
    <Categories/>
  </div>)
}