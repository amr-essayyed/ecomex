import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-black bg-home-img">

        <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">

            <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/60 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
                <h1 className="text-4xl font-bold">Ecomext Ecommerce App</h1>
                <p>Designed and Implemeted by: Amr Elsayed</p>
                <Link href="products"
                    className="hover:underline"
                >Shop Now</Link>
            </div>

        </main>

    </div>
  );
}
