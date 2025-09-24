import React, { Suspense } from 'react';
import Posts from '../ui/postSkeleton';


async function Products(){
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return(
        <ul>
            <li>products 1</li>
            <li>products 2</li>
        </ul>
    )
}

export default async function page(){
    return (
      <div>
        <h1>dashborad</h1>

        <h2>posts</h2>
        <Suspense fallback={<p>loading post...</p>} >
        <Posts/>    
        </Suspense>

        <h2>products</h2>
        <Suspense fallback={<p>loading product....</p>}>
        <Products />
        </Suspense>
      </div>
    );
  



}