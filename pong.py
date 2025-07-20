import pygame
import sys

# Game settings
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100
BALL_SIZE = 15
PADDLE_SPEED = 5
BALL_SPEED_X = 4
BALL_SPEED_Y = 4
FONT_SIZE = 36

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Pong")
    clock = pygame.time.Clock()

    font = pygame.font.Font(None, FONT_SIZE)

    # Paddles and ball
    player = pygame.Rect(20, SCREEN_HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
    ai = pygame.Rect(SCREEN_WIDTH - 30, SCREEN_HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
    ball = pygame.Rect(
        SCREEN_WIDTH // 2 - BALL_SIZE // 2,
        SCREEN_HEIGHT // 2 - BALL_SIZE // 2,
        BALL_SIZE,
        BALL_SIZE,
    )

    ball_speed_x = BALL_SPEED_X
    ball_speed_y = BALL_SPEED_Y

    player_score = 0
    ai_score = 0

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP] and player.top > 0:
            player.y -= PADDLE_SPEED
        if keys[pygame.K_DOWN] and player.bottom < SCREEN_HEIGHT:
            player.y += PADDLE_SPEED

        # Simple AI movement
        if ai.centery < ball.centery and ai.bottom < SCREEN_HEIGHT:
            ai.y += PADDLE_SPEED
        if ai.centery > ball.centery and ai.top > 0:
            ai.y -= PADDLE_SPEED

        # Move the ball
        ball.x += ball_speed_x
        ball.y += ball_speed_y

        # Collision with top/bottom
        if ball.top <= 0 or ball.bottom >= SCREEN_HEIGHT:
            ball_speed_y *= -1

        # Collision with paddles
        if ball.colliderect(player) and ball_speed_x < 0:
            ball_speed_x *= -1
        if ball.colliderect(ai) and ball_speed_x > 0:
            ball_speed_x *= -1

        # Scoring
        if ball.left <= 0:
            ai_score += 1
            ball.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
            ball_speed_x = BALL_SPEED_X
            ball_speed_y = BALL_SPEED_Y
        if ball.right >= SCREEN_WIDTH:
            player_score += 1
            ball.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
            ball_speed_x = -BALL_SPEED_X
            ball_speed_y = BALL_SPEED_Y

        # Drawing
        screen.fill(BLACK)
        pygame.draw.rect(screen, WHITE, player)
        pygame.draw.rect(screen, WHITE, ai)
        pygame.draw.ellipse(screen, WHITE, ball)
        pygame.draw.aaline(screen, WHITE, (SCREEN_WIDTH // 2, 0), (SCREEN_WIDTH // 2, SCREEN_HEIGHT))

        player_text = font.render(str(player_score), True, WHITE)
        ai_text = font.render(str(ai_score), True, WHITE)
        screen.blit(player_text, (SCREEN_WIDTH // 4 - player_text.get_width() // 2, 20))
        screen.blit(ai_text, (SCREEN_WIDTH * 3 // 4 - ai_text.get_width() // 2, 20))

        pygame.display.flip()
        clock.tick(FPS)

    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()
