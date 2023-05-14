type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="mx-auto global-padding">{children}</div>
}

export default Container
