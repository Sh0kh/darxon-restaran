<script setup>
import '@/assets/Style/Contact/Hero.css'
import '@/assets/Style/Contact/Form.css'
import '@/assets/Style/Contact/Map.css'
import '@/assets/Style/Home/Contact.css'
import { reactive } from 'vue';
import axios from '@/services/axios'
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
const con__title = ref(null);

onMounted(() => {

  gsap.fromTo(
    con__title.value, 
    { y: '-100%', opacity: 0 }, 
    { y: '0%', opacity: 1, duration: 2, ease: 'power2.out' },
  );})


const contact = reactive ({
    phone: "",
    info: "",
})
const createContact = () => {
    const data = {
        phone: String(contact.phone),
        info: contact.info,
    };

    axios
        .post("/contact/create", data, {
        })
        .then((res) => {
            contact.phone = "";
            contact.info = "";
            location.reload()
        })
        .catch((error) => {
        });

}
</script>
<template>
    <section class="Contact-hero">
        <div class="Contact-hero-shadow">
        </div>
        <div class="container">   
            <h1 ref="con__title">
                {{ $t('ContactPg_title') }}
            </h1>
        </div>
    </section>
   
    <section class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d758.6234586059487!2d68.78717926574505!3d40.486461650611396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b2079c402bfe31%3A0x349a7367ac1670d9!2sDARXON!5e0!3m2!1sru!2s!4v1734273492570!5m2!1sru!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
       
    </section>
    
</template>