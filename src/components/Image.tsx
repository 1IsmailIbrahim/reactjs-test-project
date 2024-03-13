interface IProps {
  Url: string;
  alt: string;
  className?: string;
}
const Image = ({ Url, alt, className }: IProps) => {
  return <img src={Url} alt={alt} className={className} />;
};

export default Image;
