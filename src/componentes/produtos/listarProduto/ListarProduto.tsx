import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Produto }from '../../../model/Produto';
import { busca } from '../../../services/Service'
import { Grid, Box, Typography, Stack, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import './ListarProduto.css';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'

function ListarProduto() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado")
      navigate("/login")
  
    }
  }, [token])

  async function getProduto() {
    await busca("/produtos", setProdutos, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getProduto()

  }, [produtos.length])

  return (
    <>
		<Grid container direction="row" justifyContent="center" style={{ gap: '16px' }}>
      {produtos.map(produto => (
				<Card
				width="224px"
				height="216"
			className="produto">
				<CardMedia
				borderRadius="8px"
        component="img"
        image={produto.foto}
				/>
				<Box
				height="121px"
				backgroundColor='white'
				marginTop="-80px"
				borderRadius="26px 26px 8px 8px"
				position="relative"
				>
        <Typography className="categoriasProduto">
				{produto.categorias?.descricao}
        </Typography>
        <Typography className="nomeProduto"> 
				{produto.nome}
        </Typography>
				<Grid container>
				<Grid xs={6}>
        <Typography className="precoProduto">
				R$ {produto.preco}
        </Typography>
				</Grid>
				<Grid xs={6} className="editarProduto">
				<Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none" >
				<DeleteIcon scale="1.5"/>
				</Link>
				<Link to={`/produtos/${produto.id}`} className="text-decorator-none" >
				<EditIcon scale="1.5"/>
				</Link>
				</Grid>
				</Grid>
				</Box>
				</Card>
				))
			}
	</Grid>
		</>
		)
}

export default ListarProduto;
