export default function generateMatchNumber(){

    const year=new Date().getFullYear();

    const random=Math.floor(

        100000+Math.random()*900000

    );

    return `RSCC-M-${year}-${random}`;

}
