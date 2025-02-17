import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

export const deliveryOptions=[
    {
        deliveryOptionId: '1',
        duration: 7,
        priceCents: 0
    },
    {
        deliveryOptionId: '2',
        duration: 3,
        priceCents: 499
    },
    {
        deliveryOptionId: '3',
        duration: 1,
        priceCents: 799
    }
];

export function calculateDeliveryDate(deliveryOptionId){
    const today = dayjs();
    const duration = deliveryOptions.find((option) => option.deliveryOptionId === deliveryOptionId).duration;
    const deliveryDate = today.add(duration, 'days');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');
    return deliveryDateString;
}