import Image from "next/image";

export default function CaroselComponent() {
  return (
    <>
      <div className="carousel w-full hidden sm:flex">
        <div id="item1" className="carousel-item w-full">
          <img
            alt="image1"
            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/17/f5d0033d-329c-4f09-908f-d2625b96c5d2.jpg.webp?ect=4g"
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            alt="image2"
            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/4/18/a82eb438-d9c9-4399-818a-e5d77cf7884e.jpg.webp?ect=4g"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            alt="image3"
            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/20/bedc5ce5-7c64-4706-9ccc-234151d85f22.jpg.webp?ect=4g"
            className="w-full"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            alt="image4"
            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/20/e4500349-2354-4307-a7d7-6ad0d90a513c.jpg.webp?ect=4g"
            className="w-full"
          />
        </div>
      </div>
      <div className=" justify-center w-full py-2 gap-2 hidden sm:flex">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </>
  );
}
