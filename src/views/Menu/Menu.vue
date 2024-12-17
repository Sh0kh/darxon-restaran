 <script>
import '@/assets/Style/Menu/Hero.css'
import '@/assets/Style/Menu/Menu.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { ref, reactive, onMounted } from 'vue';
import CONFIG from '../../stores/config'
import axios from '../../services/axios'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
// import gsap from 'gsap';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
export default {
    components: {
        Swiper,
        SwiperSlide,
        axios,
        CONFIG
    },
    setup() {

        const swiper = useSwiper();
        
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };

        const activeIndex = ref(null);


        const store = reactive({
            categoryAll: false,
            menuAll: false,
            menuCategory: [],
            lang: false,
            pdf:false
        });

        const getAllCategory = () => {
            axios
                .get("/category/find-all", {
                })
                .then((res) => {
                    store.categoryAll = res.data
                    store.categoryAll = store.categoryAll.reverse()
                })
                .catch((error) => {
                });
        };

        const category = (id) => {
            activeIndex.value = id;
            store.menuCategory = []
            for (let i in store.menuAll) {
                if (store.menuAll[i].category_id == id) {
                    store.menuCategory.push(store.menuAll[i])
                }
            }
        }

        const getAllMenu = () => {
            axios
                .get("/menu/find-all", {
                })
                .then((res) => {
                    store.lang = localStorage.getItem('Lan')
                    store.menuAll = res.data
                    store.menuAll = store.menuAll.reverse()
                    store.menuAll.sort(function (x, y) {
                        return (x.status === y.status) ? 0 : x.status ? -1 : 1;
                    });
                    store.menuCategory = store.menuAll
                })
                .catch((error) => {
                });
        };
        const getPdf = () => {
    axios
        .get("/pdf-menu/find-all", {

        })
        .then((res) => {
            store.pdf = res.data
        })
        .catch((error) => {
        });
}
        onMounted(() => {
            getPdf()
            category();
            getAllCategory();
            getAllMenu()
        })


        return {
            getPdf,
            CONFIG,
            category,
            getAllMenu,
            getAllCategory,
            store,
            activeIndex,
            onSwiper,
            onSlideChange,
            swiper,
            modules: [Navigation, Pagination, A11y, Autoplay]
        };
    }
}


</script>
<template>
    <section class="Menu-Hero">
        <div class="container Menu-hero-wrapper">
            <div class="Menu-hero-shadow">

            </div>
            <h1 ref="Menu_title">
                {{ $t('Menu_title1') }}
            </h1>
        </div>
    </section>
   
    <section class="All-Menu">
        <div class="container">
            <h1 class="All-Menu-title">
                {{ $t('Menu_title2') }}
            </h1>
            <div class="All-menu-wrapper">
                <a href="" target="_blank"> {{ $t('Menu_btn2') }}</a>

            </div>
        </div>
    </section>
</template>
