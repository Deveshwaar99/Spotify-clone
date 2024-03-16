'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex items-center select-none touch-none w-full h-10', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[3px] w-4 grow rounded-full bg-neutral-600">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-white" />
    </SliderPrimitive.Track>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
