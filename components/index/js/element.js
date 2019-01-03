import Vue from "vue";
import { Carousel, CarouselItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

export const element = () => {
  Vue.use(Carousel);
  Vue.use(CarouselItem);
};
