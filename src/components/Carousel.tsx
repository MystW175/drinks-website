import { prisma } from "@/lib/db/prisma";
import Hero from "./heroCard";
import SliderButton from "./sliderButtons";

export default async function Carousel() {

    const products = await prisma.product.findMany({
        orderBy: { id: "desc" }
    })
    return (<div className="w-full relative">
        <SliderButton/>
        <div id='carousel' className="carousel w-full h-min py-2 sm:py-4 md:py-8 sm:bg-green-300">
            <div id="slide1" className="carousel-item relative w-full justify-center">
                <Hero productId={products[0].id} name={products[0].name} imageUrl={products[0].imageUrl} desc={products[0].description}/>
            </div>
            <div id="slide2" className="carousel-item relative w-full justify-center">
            <Hero productId={products[1].id} name={products[1].name} imageUrl={products[1].imageUrl} desc={products[1].description}/>
            </div>
            <div id="slide3" className="carousel-item relative w-full justify-center">
            <Hero productId={products[2].id} name={products[2].name} imageUrl={products[2].imageUrl} desc={products[2].description}/>
            </div>
            <div id="slide4" className="carousel-item relative w-full justify-center">
            <Hero productId={products[3].id} name={products[3].name} imageUrl={products[3].imageUrl} desc={products[3].description}/>
            </div>
        </div>
        </div>
    );
}