
interface HighlightsImages {
    img: string,
    text: string,
}

interface LandingPageNews {
    img: string,
    title: string,
    text: string,
    span: string
}

export const landingPageHighLights: HighlightsImages[] = [
    {
        img: '/images/interviews.png',
        text: "Interviews"
    },
    {
        img: '/images/destination.png',
        text: "Destination Highlight"
    },
    {
        img: '/images/fashion.jpg',
        text: "Fashion"
    },
    {
        img: '/images/culture.png',
        text: "Culture"
    },
]


export const landingPageNews: LandingPageNews[] = [
   { img: '/images/hannatu.jpg',
    title: 'Interview with Nigeria’s Minister of Tourism & Creative Economy - Hannatu Musa Musawa',
    text: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per.",
    span: 'continue reading'
}
   ]


export const landingPageNews2: LandingPageNews[] = [
   { img: '/images/hannatu.jpg',
    title: 'International Airlines: Global Connections to Nigeria',
    text: "Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero . Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate ... ",
    span: 'continue reading'
}
   ]

   export const landingPageNews3: HighlightsImages[] = [
    {
        img: '/images/interviews.png',
        text: "Taste of Naija: Nigeria on a Plate – Jollof to AfangSoup"
    },
    {
        img: '/images/destination.png',
        text: " Hotel Spotlight: Top 5 Luxury Stays in Nigeria"
    },
    {
        img: '/images/fashion.jpg',
        text: "Aviation Feature: Domestic Airlines & Their Routes"
    },
]