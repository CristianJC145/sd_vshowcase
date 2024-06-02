import CardProducts from "../components/CardProducts";
import AppCarousel from "../../../shared/components/Carousel/AppCarousel";
import ButtonCategories from "../components/ButtonCategories";
import styled from "styled-components";

import { ButtonProvider } from "../../../shared/contexts/ButtonContext";


function HomePage() {
  const dynamicImages = [
    "src/assets/images/1.webp",
    "src/assets/images/2.webp",
    "src/assets/images/3.webp",
  ];
  return (
    <ButtonProvider>
      <HomePageStyles>
        <article>
          <AppCarousel interval={5000} images={dynamicImages} />
        </article>
        <article>
          <div className="vs-menu-options">
            <h4 className="vs-menu-title">Recomendado para ti</h4>
            <div className="vs-options">
              <ButtonCategories
                label="Todos"
                icon="fa-gem"
                ariaLabel="Button all"
              ></ButtonCategories>
              <ButtonCategories
                label="Favoritos"
                icon="fa-heart"
                ariaLabel="Button favorite"
              ></ButtonCategories>
              <ButtonCategories
                label="Mejor Calificacion"
                icon="fa-star"
                ariaLabel="Button best score "
              ></ButtonCategories>
              <ButtonCategories
                label="Promociones"
                icon="fa-tag"
                ariaLabel="Button promotions"
              ></ButtonCategories>
            </div>
          </div>
        </article>
        <article>
        <div className="vs-cards">
            <CardProducts
              imageSrc="http://localhost:5173/src/assets/images/iphone.webp"
              description="test"
              price="2.790.000"
              sellerName="cristian"
              shippingPrice="Gratis"
              url={{
                pathname: `product test`,
                state: "test",
              }}
            />
            <CardProducts
              imageSrc="http://localhost:5173/src/assets/images/iphone.webp"
              description="test"
              price="2.790.000"
              sellerName="cristian"
              shippingPrice="Gratis"
              url={{
                pathname: `product test`,
                state: "test",
              }}
            />
            <CardProducts
              imageSrc="http://localhost:5173/src/assets/images/iphone.webp"
              description="test"
              price="2.790.000"
              sellerName="cristian"
              shippingPrice="Gratis"
              url={{
                pathname: `product test`,
                state: "test",
              }}
            />
            <CardProducts
              imageSrc="http://localhost:5173/src/assets/images/iphone.webp"
              description="test"
              price="2.790.000"
              sellerName="cristian"
              shippingPrice="Gratis"
              url={{
                pathname: `product test`,
                state: "test",
              }}
            />
          </div>
        </article>
      </HomePageStyles>
    </ButtonProvider>
  );
}

export default HomePage;

const HomePageStyles = styled.div`
  .vs-menu-options {
    margin: 1.5rem 0 0;
  }
  .vs-menu-title {
    font-weight: 600;
    color: #2d2f31;
  }
  .vs-options {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: var(--p-6) 0;
  }
  .vs-options::-webkit-scrollbar {
    display: none;
  }
  .vs-btnOptions {
    font-weight: 600;
  }
  .vs-cards {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 40%), 1fr));
    padding-bottom: var(--p-6);
  }

  @media (min-width: 768px) {
    .vs-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 30%), 1fr));
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
  }
  @media (min-width: 992px) {
    .vs-menu-options {
      margin: 1.5rem 1.5rem 1rem;
    }
    .vs-cards {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 20%), 1fr));
    }
  }
  @media (min-width: 1200px) {
    .vs-cards {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 18%), 1fr));
      gap: 1.5rem;
    }
  }
`;
