import { item, footer, footerText } from '../styles/Index.module.sass'
export default function Footer() {
  return (
    <div className={item}>
      <div className={footer}>
        <div>Made with ❤️</div>
        <a
          className={footerText}
          href="https://github.com/kristophesankar/pomolotl"
        >
          pomolotl.netlify.app
        </a>
        <br />
      </div>
    </div>
  )
}
