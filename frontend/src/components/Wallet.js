import * as web3 from '@solana/web3.js'
import { useCallback, useEffect, useState } from 'react'
import { GrRefresh } from 'react-icons/gr'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {connectToWalletState, messageState, todayCompanyState} from '../store/atoms'

function Wallet() {
  const [todayCompany] = useRecoilState(todayCompanyState)
  const [connection, setConnection] = useState(null)
  const [balance, setBalance] = useState(0)
  const [sign, setSign] = useState(null)
  const [connectToWallet] = useRecoilState(connectToWalletState)
  const setMessage = useSetRecoilState(messageState)

  useEffect(() => {
    const connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed',
    )
    setConnection(connection)
  }, [])

  const getAccountInfo = useCallback(() => {
    connection.getAccountInfo(window.solana.publicKey).then((res) => {
      setBalance(res?.lamports || 0)
    })
  }, [connection, setBalance])

  useEffect(() => {
    if (connectToWallet) {
      getAccountInfo()
    }
  }, [connectToWallet, getAccountInfo])

  const shortAddress = () => {
    if (!window.solana.publicKey) {
      return null
    }

    const address = window.solana.publicKey.toString()
    return address.slice(0, 6) + '...' + address.slice(-6)
  }

  const explorerUrl = () => {
    return `https://explorer.solana.com/address/${window.solana.publicKey.toString()}?cluster=devnet`
  }

  const balanceSol = () => {
    return balance * 0.000000001
  }

  const getAirDrop = async () => {
    try {
      const airdropSignature = await connection.requestAirdrop(
        window.solana.publicKey,
        web3.LAMPORTS_PER_SOL, // 10000000 Lamports in 1 SOL
      )
      await connection.confirmTransaction(airdropSignature)

      const account = await connection.getAccountInfo(window.solana.publicKey)
      setBalance(account?.lamports || 0)
    } catch (err) {
      console.log(err)
      setMessage('Try Air Drop too many times')
    }
  }

  if (!connectToWallet) {
    return null
  }

  const createTransferTransaction = async () => {
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: window.solana.publicKey,
        toPubkey: new web3.PublicKey(todayCompany.holderAddress),
        lamports: web3.LAMPORTS_PER_SOL / 10000,
      }),
    )
    transaction.feePayer = window.solana.publicKey
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash
    return transaction
  }

  const sendBonus = async () => {
    setSign(null)
    const transaction = await createTransferTransaction()
    if (transaction) {
      try {
        const signedTransaction = await window.solana.signTransaction(
          transaction,
        )
        const signature = await connection.sendRawTransaction(
          signedTransaction.serialize(),
        )
        await connection.confirmTransaction(signature)
        setMessage('Transfer Confirmed')
        setSign(signature)
      } catch (err) {
        console.log(err)
        setMessage('Transaction Error...')
      }
    }
  }

  // dev net
  const explorer = () => {
    return `https://explorer.solana.com/tx/${sign}?cluster=devnet`
  }

  return (
    <div className="mh2 mt2 mb3 pa2 ba b--silver">
      <div className="flex justify-between">
        <h4> Wallet </h4>
        <div className="pt3 pointer" onClick={getAccountInfo}>
          <GrRefresh size={'1.2em'} />
        </div>
      </div>
      <a
        href={explorerUrl()}
        target="_blank"
        rel="noreferrer"
        className="db blue no-underline"
      >
        {shortAddress()}
      </a>
      <p>Network: DevNet</p>
      <p>Total Balance: {balanceSol()} SOL</p>
      {sign && (
        <div className="mb2 pv2">
          <a
            className="db blue no-underline"
            href={explorer()}
            target="_blank"
            rel="noreferrer"
          >
            Check The Transaction Result
          </a>
        </div>
      )}
      <div className="mb2 pa2 tc ba b--silver pointer" onClick={getAirDrop}>
        Get AirDrop
      </div>
      <div className="pa2 tc ba b--silver pointer" onClick={sendBonus}>
        打賞給發起人 0.0001 SOL
      </div>
    </div>
  )
}

export default Wallet
