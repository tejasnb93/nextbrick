<?php
    session_start();

    class CaptchaSecurityImages {

        var $font = '/var/www/html/alexa-alexa.ttf';

        function generateCode($characters) {
            /* list all possible characters, similar looking characters and vowels have been removed */
            $possible = 'abcdefghijklmnopqrstuvwxyz';
            $code = '';
            $i = 0;
            while ($i < $characters) { 
                $code .= substr($possible, mt_rand(0, strlen($possible)-1), 1);
                $i++;
            }
            return $code;
        }

        function CaptchaSecurityImages($width='90',$height='33',$characters='5') {
            $code = $this->generateCode($characters);
            /* font size will be 75% of the image height */
            $font_size = $height * .7;
            $image = @imagecreate($width, $height) or die('Cannot initialize new GD image stream');
            /* set the colours */
            $background_color = imagecolorallocate($image, 255, 255, 255);
            $text_color = imagecolorallocate($image, 0, 127, 255);
            $noise_color = imagecolorallocate($image, 161, 202, 241);
            /* generate random dots in background */
            for( $i=0; $i<($width*$height)/3; $i++ ) {
                imagefilledellipse($image, mt_rand(0,$width), mt_rand(0,$height), 1, 1, $noise_color);
            }
            /* generate random lines in background */
            for( $i=0; $i<($width*$height)/120; $i++ ) {
                imageline($image, mt_rand(0,$width), mt_rand(0,$height), mt_rand(0,$width), mt_rand(0,$height), $noise_color);
            }
            /* create textbox and add text */
            $textbox = imagettfbbox($font_size, 0, $this->font, $code) or die('Error in imagettfbbox function');
            $x = ($width - $textbox[4])/2;
            $y = ($height - $textbox[5])/2;
            imagettftext($image, $font_size, 0, $x, $y, $text_color, $this->font , $code) or die('Error in imagettftext function');
			
			
            /* output captcha image to browser */
            header('Content-Type: image/jpeg');
            imagejpeg($image);
            imagedestroy($image);
            $_SESSION['security_code'] = $code;
        }

    }

    $width = isset($_GET['width']) ? $_GET['width'] : '90';
    $height = isset($_GET['height']) ? $_GET['height'] : '33';
    $characters = isset($_GET['characters']) && $_GET['characters'] > 1 ? $_GET['characters'] : '5';

    $captcha = new CaptchaSecurityImages($width,$height,$characters);

?>