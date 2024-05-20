import Sidebar from "../../components/sidebar/sidebar.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import "./home.css"
import icons from "../../styles/icons.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js"

// function Home() {}
const Home = () => {

    const navigate = useNavigate();
    const [despesas, setDespesas] = useState([]);
    const [total, setTotal] = useState(0)

    const listarDespesas = async (busca) => {

        try {
            // Acessar dados na API
            const response = await api.get("despesas/", { params: 
                {filtro: busca}
            })
            

            setDespesas(response.data)
            
            let soma = 0
            for (var i= 0; i < response.data.length; i++) {
                soma = soma + Number(response.data[i].valor);
            }
            setTotal(soma)
        } catch (error) {
            alert("Erro ao buscar dados")
            console.log(error)
        }
    }

    const OpenDespesa = (id) => {
        navigate("/despesa/" + id)
    }

    const DeleteDespesa = async (id) => {
        try {
            await api.delete("/despesas/" + id)
            listarDespesas()
        } catch (error) {
            alert("Erro ao excluir despesa")
            console.log(error)
        }
    }

    useEffect(()=>{
        listarDespesas();
    }, [])

    return <>
        <Sidebar />
        <Navbar onClickSearch={listarDespesas} total={total} search/>
        <div className="container-home"> 
            <div className="title-home">
              <h1>Despesas</h1>
              <button onClick={() => navigate("/despesa/add")} className="btn btn-green">Adicionar Despesas</button>
            </div>

            <div className="box-despesa">
                <table>
                    <thead>
                        <tr>
                            <th>Id. Despesa</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th className="text-right">Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            despesas.map((desp) => {
                                return <tr>
                                <td>{desp.id}</td>
                                <td>{desp.descricao}</td>
                                <td><div><img className="icon-table" src={desp.categoriaDetalhe.icon} /> <span className="ml-10">{desp.categoria}</span></div></td>
                                <td className="text-right">R$ {Number(desp.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                <td className="text-right">
                                    <button className="btn btn-blue" onClick={() => OpenDespesa(desp.id)}
                                       ><img className="icon-sm" src={icons.edit} alt="editar" /></button>

                                    <button className="btn btn-red ml-10" onClick={() => DeleteDespesa(desp.id)}
                                    ><img className="icon-sm" src={icons.remove} alt="editar" /></button>
                                </td>
                            </tr>
                            })
                        }
                        
                    </tbody>
                </table>
                        {
                            despesas.length == 0 && <div className="empty-despesas">
                                <img src={icons.empty} className="empty-icon" />
                                <p>Nenhuma despesa encontrada</p>
                            </div>
                        }
            </div>
        </div>
    </>
}


export default Home;