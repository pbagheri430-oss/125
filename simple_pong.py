"""Simple Pong game with difficulty levels using pygame."""

import sys
import random
import pygame


# ---------------------------------------------------------------------------
# Configuration constants
# ---------------------------------------------------------------------------
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60

PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100
BALL_SIZE = 15

PLAYER_SPEED = 5
BALL_SPEED = 5
AI_SPEEDS = {
    "Easy": 3,
    "Normal": 5,
    "Hard": 7,
}

WIN_SCORE = 10
FONT_SIZE = 36

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)


def draw_text(surface, text, font, color, x, y, center=False):
    """Render text helper."""

    text_obj = font.render(text, True, color)
    rect = text_obj.get_rect()
    if center:
        rect.center = (x, y)
    else:
        rect.topleft = (x, y)
    surface.blit(text_obj, rect)


def difficulty_menu(screen, clock, font):
    """Display the difficulty selection menu."""

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_1:
                    return AI_SPEEDS["Easy"]
                if event.key == pygame.K_2:
                    return AI_SPEEDS["Normal"]
                if event.key == pygame.K_3:
                    return AI_SPEEDS["Hard"]

        screen.fill(BLACK)
        draw_text(screen, "Select Difficulty", font, WHITE, SCREEN_WIDTH // 2, 150, center=True)
        draw_text(screen, "1 - Easy", font, WHITE, SCREEN_WIDTH // 2, 250, center=True)
        draw_text(screen, "2 - Normal", font, WHITE, SCREEN_WIDTH // 2, 300, center=True)
        draw_text(screen, "3 - Hard", font, WHITE, SCREEN_WIDTH // 2, 350, center=True)

        pygame.display.flip()
        clock.tick(FPS)


def wait_for_restart(screen, clock, font, message):
    """Display win/lose message and wait for a keypress to restart."""

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                return

        screen.fill(BLACK)
        draw_text(screen, message, font, WHITE, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2, center=True)
        draw_text(screen, "Press any key to play again", font, WHITE, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 50, center=True)
        pygame.display.flip()
        clock.tick(FPS)


def game_loop(screen, clock, font, ai_speed):
    """Main game loop."""

    player = pygame.Rect(20, SCREEN_HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
    ai = pygame.Rect(SCREEN_WIDTH - 30, SCREEN_HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
    ball = pygame.Rect(
        SCREEN_WIDTH // 2 - BALL_SIZE // 2,
        SCREEN_HEIGHT // 2 - BALL_SIZE // 2,
        BALL_SIZE,
        BALL_SIZE,
    )

    ball_speed_x = BALL_SPEED if random.choice([True, False]) else -BALL_SPEED
    ball_speed_y = BALL_SPEED if random.choice([True, False]) else -BALL_SPEED

    player_score = 0
    ai_score = 0

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP] and player.top > 0:
            player.y -= PLAYER_SPEED
        if keys[pygame.K_DOWN] and player.bottom < SCREEN_HEIGHT:
            player.y += PLAYER_SPEED

        # AI paddle follows the ball at the selected difficulty speed
        if ai.centery < ball.centery and ai.bottom < SCREEN_HEIGHT:
            ai.y += ai_speed
        if ai.centery > ball.centery and ai.top > 0:
            ai.y -= ai_speed

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
            ball_speed_x = BALL_SPEED
            ball_speed_y = BALL_SPEED if random.choice([True, False]) else -BALL_SPEED
        if ball.right >= SCREEN_WIDTH:
            player_score += 1
            ball.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
            ball_speed_x = -BALL_SPEED
            ball_speed_y = BALL_SPEED if random.choice([True, False]) else -BALL_SPEED

        # Draw everything
        screen.fill(BLACK)
        pygame.draw.rect(screen, WHITE, player)
        pygame.draw.rect(screen, WHITE, ai)
        pygame.draw.ellipse(screen, WHITE, ball)
        pygame.draw.aaline(screen, WHITE, (SCREEN_WIDTH // 2, 0), (SCREEN_WIDTH // 2, SCREEN_HEIGHT))

        draw_text(screen, str(player_score), font, WHITE, SCREEN_WIDTH // 4, 20, center=True)
        draw_text(screen, str(ai_score), font, WHITE, SCREEN_WIDTH * 3 // 4, 20, center=True)

        pygame.display.flip()
        clock.tick(FPS)

        # Check for win condition
        if player_score >= WIN_SCORE:
            wait_for_restart(screen, clock, font, "YOU WIN")
            running = False
        elif ai_score >= WIN_SCORE:
            wait_for_restart(screen, clock, font, "YOU LOSE")
            running = False


def main():
    """Program entry point."""

    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Pong")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, FONT_SIZE)

    while True:
        ai_speed = difficulty_menu(screen, clock, font)
        game_loop(screen, clock, font, ai_speed)


if __name__ == "__main__":
    main()

