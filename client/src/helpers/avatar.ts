import { User } from 'types/user.type';

export const generateImageSrc = ({ facebook_id, image }: User, imageLink?: string) => {
  let imgSrc =
    'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png';
  imgSrc = facebook_id
    ? `http://graph.facebook.com/${facebook_id}/picture?type=large`
    : imgSrc;
  imgSrc = image ? image.link : imgSrc;
  imgSrc = imageLink ? imageLink : imgSrc;

  return imgSrc;
};
