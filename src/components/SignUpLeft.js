import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import "./SignUpLeft.css"
const imagelist=[{
    id:1,
    animeName:'Naruto',
    imageUrl:'https://quirkyvibe.com/cdn/shop/files/19_5c20853d-2bfa-43b0-adce-40feffe54f0f_900x.jpg?v=1690574407',
    name:'Kakashi Oversized T-Shirt'
},
{
    id:2,
    animeName:'One Piece',
    imageUrl:'https://quirkyvibe.com/cdn/shop/files/Untitleddesign_14-min_540x.png?v=1690139450',
    name:'Gear Fourth Luffy Oversized T-Shirt'
},
{
    id:3,
    animeName:'Demon Slayer',
    imageUrl:'https://quirkyvibe.com/cdn/shop/files/32_fd01e3aa-f6af-47a1-8f74-ba2807ed9437_540x.jpg?v=1690408119',
    name:'Girls Rengoku Oversized T-Shirt'
},
{
    id:4,
    animeName:'Dragon Ball',
    imageUrl:'https://quirkyvibe.com/cdn/shop/files/1_540x.jpg?v=1690406309',
    name:'Vegeta Oversized T-Shirt'
},
{
    id:5,
    animeName:'Naruto',
    imageUrl:'https://quirkyvibe.com/cdn/shop/files/9_2385f4c1-4a21-4e00-b743-d817ada17bce_540x.jpg?v=1690829154',
    name:' Girls Itachi Oversized T-Shirt'
},
{
    id:6,
    animeName:'Jujustu Kaisen',
    imageUrl:'https://www.fansarmy.in/cdn/shop/products/70_d0c78463-3392-4387-8c05-6547d85b2cae_1800x1800.jpg?v=1672144837',
    name:'Gojo Satoru Oversized Hoodie'
},
{
    id:7,
    animeName:'Dragon Ball',
    imageUrl:'https://www.fansarmy.in/cdn/shop/products/93_052f60f2-f462-4f0a-b33a-217d053b73b4_1800x1800.jpg?v=1671371432',
    name:'Dragon Ball Z Anime Jacket'
},
{
    id:8,
    animeName:'One Piece',
    imageUrl:'https://www.fansarmy.in/cdn/shop/products/31_1800x1800.jpg?v=1669473442',
    name:'Roronoa Zoro Sweatshirt'
},
{
    id:9,
    animeName:'One Piece',
    imageUrl:'https://www.fansarmy.in/cdn/shop/files/51_7aa6dfd2-2a8a-4642-b3e6-78dbc3d23664_1800x1800.jpg?v=1690899732',
    name:'Luffy Gear 5 Shoes'
},
{
    id:10,
    animeName:'Attack On Titan',
    imageUrl:'https://www.fansarmy.in/cdn/shop/files/15_20f48ed2-888d-4a6f-b3b8-3930305bb12c_1800x1800.jpg?v=1686399911',
    name:'Attack On Titan Anime Cap'
},
{
    id:11,
    animeName:'Black Clover',
    imageUrl:'https://www.fansarmy.in/cdn/shop/files/eren_2_1800x1800.jpg?v=1684568502',
    name:'Asta Black Clover Tank top'
},
{
    id:12,
    animeName:'Chainsaw Man',
    imageUrl:'https://www.fansarmy.in/cdn/shop/products/chainsawman1_1800x1800.jpg?v=1678081651',
    name:'Chainsaw Man T-Shirt'
}


]

function SignUpLeft() {
  return (
    <div>
        <div className='signup-products'>
        <h2 >OUR PRODUCTS</h2>
        </div>
        <ImageList sx={{width:850,height:750}} variant="woven" cols={3} gap={8}>
            {
                imagelist.map((item)=>(
                    <ImageListItem key={item.id}>
                        <img src={item.imageUrl} alt={item.animeName} loading='lazy'/>
                        <ImageListItemBar title={item.name}/>
                    </ImageListItem>
                ))
            }
        </ImageList>
    </div>
  )
}

export default SignUpLeft