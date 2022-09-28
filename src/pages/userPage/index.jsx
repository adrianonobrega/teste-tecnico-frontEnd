import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios'
import { Form } from './styles';
import { SectionForm,SectionRes,SectionPai} from './styles';


export const UserPage = () => {

    const {register,handleSubmit} = useForm();
    const [info,setInfo] = useState(undefined)


    function submit(data){

        const conver = [data].map((item) => {
            const cents = item.amount * 100
            const obj = {
                amount:cents,
                installments: parseInt(item.installments),
                mdr: parseInt(item.mdr),
                days: [15,30, 60, 90]
            }
            
            const headers = {
                'Content-Type': 'application/json'
            }

            axios.post("https://frontend-challenge-7bu3nxh76a-uc.a.run.app",obj,{headers})
            .then((res) => [res.data].map((item) => {
                const obj = {
                    15: item[15] / 100,
                    30: item[30] / 100,
                    60: item[60] / 100,
                    90: item [90] / 100
                }
                setInfo(obj)
            }))
            .catch((err) => console.log(err))
        })
        
        return conver
    }


    return(

        <section>
            <SectionForm>
            <h2>Simule sua Antecipação</h2>
             <Form onSubmit={handleSubmit(submit)}>
                

                <h6>Informe o valor da venda</h6>
                <input placeholder='R$' {...register('amount')}></input>

                <h6>Em quantas parcelas</h6>
                <input {...register('installments')}></input>

                <h6>Informe o percentual de MDR</h6>
                <input {...register('mdr')}></input>

                <button type='submit'>Enviar</button>

            </Form>
        
            </SectionForm>
           
            <SectionRes>
                <h2>Você Receberá</h2>
            <h4>Em 15 dias: {info === undefined ? <>R$ 0,00</> : <>R$ {info[15].toFixed(2)}</> } </h4>
            <h4>Em 30 dias: {info === undefined ? <>R$ 0,00</> : <>R$ {info[30].toFixed(2)}</>}</h4>
            <h4>Em 60 dias: {info === undefined ? <>R$ 0,00</> : <>R$ {info[60].toFixed(2)}</>}</h4>
            <h4>Em 90 dias: {info === undefined ? <>R$ 0,00</> : <>R$ {info[90].toFixed(2)}</>}</h4>
            </SectionRes>
   
        </section>
             
           
   
        
          
            
            
            
       
    )
}