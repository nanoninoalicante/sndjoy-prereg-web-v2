<script setup>
import { useMetaTags } from "@/composables/metatags";
const { title, description, primaryUrl, metaTagImage } = useMetaTags();
</script>
<template>
    <div class="metatags">
        <Head>
            <Title>{{ title }} </Title>
            <Meta
                name="theme-color"
                content="#109C90"
                media="(prefers-color-scheme: light)"
            ></Meta>
            <Meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            ></Meta>
            <Meta name="description" :content="description"></Meta>

            <!-- Open Graph / Facebook -->
            <Meta property="og:type" content="website"></Meta>
            <Meta property="og:url" :content="primaryUrl"></Meta>
            <Meta property="og:title" :content="title"></Meta>
            <Meta property="og:description" :content="description"></Meta>
            <Meta property="og:image" :content="metaTagImage"></Meta>

            <!-- Twitter -->
            <Meta property="twitter:card" content="summary_large_image"></Meta>
            <Meta property="twitter:url" :content="primaryUrl"></Meta>
            <Meta property="twitter:title" :content="title"></Meta>
            <Meta property="twitter:description" :content="description"></Meta>
            <Meta property="twitter:image" :content="metaTagImage"></Meta>
            <Meta
                name="google-site-verification"
                content="-3jSETOy5E1m3-_MW6m3l7Gopkubs1S8l6BfgJG9E7k"
            />
        </Head>
    </div>
</template>
